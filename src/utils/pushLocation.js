export default (pathname) => {
    window.location.pathname !== pathname && (window.location.pathname = pathname);
}
