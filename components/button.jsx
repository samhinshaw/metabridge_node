import React from 'react';
import { string } from 'prop-types';
import Link from 'next/link';

const Button = props => {
  let icon;
  if (props.icon) {
    icon = (
      <span className="icon">
        <i className={props.icon} />
      </span>
    );
  }
  return (
    <p className="control">
      <Link href={props.link}>
        <a className={props.className}>
          {icon}
          <span>{props.title}</span>
        </a>
      </Link>
    </p>
  );
};

Button.propTypes = {
  title: string.isRequired,
  link: string.isRequired,
  className: string,
  icon: string
};

Button.defaultProps = {
  className: 'button',
  icon: null
};

export default Button;
