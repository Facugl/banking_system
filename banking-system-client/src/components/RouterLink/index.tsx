import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));
RouterLink.displayName = 'RouterLink';

export default RouterLink;
