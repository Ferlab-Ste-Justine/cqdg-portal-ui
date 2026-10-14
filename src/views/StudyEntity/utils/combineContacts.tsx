import { Fragment, ReactNode } from 'react';

import ExternalMailToLink from 'components/utils/ExternalMailToLink';
import { toList } from 'utils/indexLinkedArrays';

type IndexLinkedValue = (string | null)[] | string | null;

/**
 * Joins the index-linked contact arrays into one node per contact (`name, email, institution`).
 * Unlike `combineIndexLinked`, iterates up to the longest array so trailing entries are kept.
 * Only the values present at an index are rendered; an index with no value yields no node.
 */
export const combineContacts = (
  names?: IndexLinkedValue,
  emails?: IndexLinkedValue,
  institutions?: IndexLinkedValue,
): ReactNode[] => {
  const nameList = toList(names);
  const emailList = toList(emails);
  const institutionList = toList(institutions);
  const length = Math.max(nameList.length, emailList.length, institutionList.length);

  return Array.from({ length }, (_, index) => {
    const name = nameList[index];
    const email = emailList[index];
    const institution = institutionList[index];

    const parts: ReactNode[] = [];
    if (name) parts.push(name);
    if (email) parts.push(<ExternalMailToLink email={email} />);
    if (institution) parts.push(institution);
    if (!parts.length) return null;

    return (
      <span key={index}>
        {parts.map((part, partIndex) => (
          <Fragment key={partIndex}>
            {partIndex > 0 && ', '}
            {part}
          </Fragment>
        ))}
      </span>
    );
  }).filter((node) => node !== null);
};
