/**
 * modified from https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js
 * Custom Link component
 */

import PropTypes from 'prop-types';
import clsx from 'clsx';
import NextLink from 'next/link';
import { Link as MuiLink, makeStyles } from '@material-ui/core';
import { forwardRef } from 'react';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    '&:hover, &:active, &:visited': {
      textDecoration: 'none',
      color: (props) => (props.unsetColor ? 'unset' : 'none'),
    },
  },
}));

const NextComposed = forwardRef((props, ref) => {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} as={as} prefetch={prefetch}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prefetch: PropTypes.bool,
};

const Link = (props) => {
  const {
    href,
    activeClassName = 'active',
    className: classNameProp,
    innerRef,
    unsetColor,
    ...other
  } = props;

  const classes = useStyles(props);

  const router = useRouter();

  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProp, classes.link, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  );
};

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  unsetColor: PropTypes.bool,
};

export default forwardRef((props, ref) => <Link {...props} innerRef={ref} />);
