function interceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
}
interceptorConfig.$inject = ["$httpProvider"];
export default interceptorConfig;