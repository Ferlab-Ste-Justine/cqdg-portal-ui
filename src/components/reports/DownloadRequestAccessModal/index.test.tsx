import intl from 'react-intl-universal';
import { Provider } from 'react-redux';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IStudyEntity } from 'graphql/studies/models';
import locales from 'locales';

import { LANG } from 'common/constants';
import useApi from 'hooks/useApi';
import { ReportApi } from 'services/api/reports';
import { ReportType } from 'services/api/reports/models';
import globalReducer from 'store/global';

import DownloadRequestAccessModal from './index';

// The stats table (file-request-access/stats) is fed by useApi: mocked so no request is sent.
jest.mock('hooks/useApi', () => ({ __esModule: true, default: jest.fn() }));

// getDocUrl reads the language from the application store, which is not built here.
jest.mock('utils/doc', () => ({
  getDocUrl: (path: string) => `https://docs.example.test/en/${path}`,
}));

const sqon: ISyntheticSqon = {
  op: 'and',
  content: [{ op: 'in', content: { field: 'file_id', value: ['FI0000001'] } }],
};

// Fictitious study returned by the stats endpoint.
const stats = [{ key: 'STUDY-A', study_name: 'Study Alpha', nb_files: 1 }];

const buildStore = () => configureStore({ reducer: { global: globalReducer } });

const renderModal = (props: Partial<Parameters<typeof DownloadRequestAccessModal>[0]> = {}) => {
  const store = buildStore();
  render(
    <Provider store={store}>
      <DownloadRequestAccessModal sqon={sqon} {...props} />
    </Provider>,
  );
  return store;
};

const openModal = async () => {
  await userEvent.click(screen.getByRole('button', { name: /Request access/ }));
  return screen.findByRole('dialog');
};

const okButton = (dialog: HTMLElement) => within(dialog).getByRole('button', { name: 'Download' });

describe('DownloadRequestAccessModal', () => {
  let generateReport: jest.SpyInstance;

  beforeAll(() => {
    intl.init({ currentLocale: LANG.EN, locales, warningHandler: () => '' });
  });

  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue({ loading: false, result: stats });
    generateReport = jest.spyOn(ReportApi, 'generateReport').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows the instructions, the documentation link and the files per study', async () => {
    renderModal();
    const dialog = await openModal();

    expect(within(dialog).getByText('Request access')).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Download an archive containing documents/),
    ).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'Data Access Request' })).toHaveAttribute(
      'href',
      'https://docs.example.test/en/acces-aux-donnees/faire-une-demande-dacces-aux-donnees-du-cqdg/',
    );
    expect(within(dialog).getByRole('checkbox')).not.toBeChecked();

    const headers = within(dialog)
      .getAllByRole('columnheader')
      .map((th) => th.textContent);
    expect(headers).toEqual(['Study', 'Study Code', 'Files']);
    const cells = within(dialog.querySelector('[data-row-key="STUDY-A"]') as HTMLElement)
      .getAllByRole('cell')
      .map((td) => td.textContent);
    expect(cells).toEqual(['Study Alpha', 'STUDY-A', '1']);

    expect(within(dialog).getByRole('button', { name: 'Cancel' })).toBeEnabled();
    expect(okButton(dialog)).toBeEnabled();
  });

  it('closes on Cancel without requesting the archive', async () => {
    renderModal();
    const dialog = await openModal();

    await userEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));

    await waitFor(() => expect(dialog).not.toBeVisible());
    expect(generateReport).not.toHaveBeenCalled();
  });

  it('requests the archive for the selection and closes once it is downloaded', async () => {
    const store = renderModal();
    const dialog = await openModal();

    await userEvent.click(okButton(dialog));

    expect(generateReport).toHaveBeenCalledWith({
      name: ReportType.FILE_REQUEST_ACCESS,
      sqon,
      withFamily: false,
      withoutFiles: false,
    });
    await waitFor(() => expect(dialog).not.toBeVisible());
    expect(store.getState().global.notification?.type).toBe('success');
  });

  it('stays open and shows an error when the archive cannot be generated', async () => {
    generateReport.mockRejectedValue(new Error('Report API unavailable'));
    const store = renderModal();
    const dialog = await openModal();

    await userEvent.click(okButton(dialog));

    await waitFor(() => expect(store.getState().global.notification?.type).toBe('error'));
    expect(dialog).toBeVisible();
  });

  it('includes the family members files when the checkbox is checked', async () => {
    renderModal();
    const dialog = await openModal();

    await userEvent.click(within(dialog).getByRole('checkbox'));
    await userEvent.click(okButton(dialog));

    expect(generateReport).toHaveBeenCalledWith(expect.objectContaining({ withFamily: true }));
    await waitFor(() => expect(dialog).not.toBeVisible());
  });

  it('cannot be opened when no file is selected', () => {
    renderModal({ isDisabled: true });

    expect(screen.getByRole('button', { name: /Request access/ })).toBeDisabled();
  });

  it('blocks the download and hides the table when too many files are selected', async () => {
    renderModal({ hasTooManyFiles: true });
    const dialog = await openModal();

    expect(within(dialog).getByText('Maximum number exceeded')).toBeInTheDocument();
    expect(within(dialog).queryByRole('table')).not.toBeInTheDocument();
    expect(okButton(dialog)).toBeDisabled();
  });

  it('blocks the download for a restricted study', async () => {
    renderModal({ isRestricted: true });
    const dialog = await openModal();

    expect(within(dialog).getByText('Restricted Study')).toBeInTheDocument();
    expect(okButton(dialog)).toBeDisabled();
  });

  it('shows the study Access Authority and no family checkbox from a study page', async () => {
    const study = {
      access_authority: { value: 'access@study.example.test' },
    } as unknown as IStudyEntity;
    renderModal({ study, withoutFiles: true });
    const dialog = await openModal();

    expect(
      within(dialog).getByText(/submit your request to the study’s Access Authority/),
    ).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'access@study.example.test' })).toHaveAttribute(
      'href',
      'mailto:access@study.example.test',
    );
    expect(within(dialog).queryByRole('checkbox')).not.toBeInTheDocument();

    await userEvent.click(okButton(dialog));
    expect(generateReport).toHaveBeenCalledWith(expect.objectContaining({ withoutFiles: true }));
    await waitFor(() => expect(dialog).not.toBeVisible());
  });
});
