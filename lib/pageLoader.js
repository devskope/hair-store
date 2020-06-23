import NProgress from 'nprogress';
import { Router } from 'next/router';

NProgress.configure({
  showSpinner: true,
  minimum: 0.01,
  easing: 'linear',
  speed: 300,
});

const stop = (timer) => {
  clearInterval(timer);
  NProgress.inc(0.2).set(1);
};

const pageLoader = () => {
  let timer;

  Router.events.on('routeChangeStart', () => {
    timer = setInterval(() => {
      NProgress.inc(0.2);
    }, 100);
  });

  Router.events.on('routeChangeComplete', () => {
    stop(timer);
  });

  Router.events.on('routeChangeError', () => {
    stop(timer);
  });
};

export default pageLoader;
