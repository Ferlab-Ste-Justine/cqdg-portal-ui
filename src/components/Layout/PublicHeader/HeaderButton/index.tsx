import React from 'react';
import { Button } from 'antd';
import cx from 'classnames';

import styles from '../../Header/index.module.css';

interface IHeaderLinkProps {
  className?: string;
  to: string | string[];
  title: string;
  currentPathName: string;
  icon?: React.ReactElement;
  onClick?: () => any;
}

const isActive = (current: string, to: string | string[]) =>
  to instanceof Array ? to.includes(current) : current === to;

const HeaderButton = ({
  className = '',
  to,
  currentPathName,
  icon,
  title,
  onClick,
  ...props
}: IHeaderLinkProps) => (
  <Button
    className={cx(
      styles.headerBtn,
      className,
      isActive(currentPathName, to) ? styles.headerBtnActive : '',
    )}
    icon={icon}
    data-cy={`HeaderLink_${title}`}
    onClick={onClick}
    {...props}
  >
    {title}
  </Button>
);

export default HeaderButton;
