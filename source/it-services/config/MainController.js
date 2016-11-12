class MainController {

    constructor($translate, $cookieStore, localStorageService) {
        this.$translate = $translate;
        this.$cookieStore = $cookieStore;
        this.localStorageService = localStorageService;
        console.log('MainController');
    }

    $onInit() {
        var defaultLang = this.localStorageService.get('lang');
        if (!defaultLang) {
            defaultLang = "en_us";
            this.localStorageService.set('lang', defaultLang);
        }
        this.$translate.use(defaultLang);
    }

}
MainController.$inject = ['$translate', '$cookieStore', 'localStorageService'];
export default MainController;