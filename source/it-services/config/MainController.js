class MainController {

    constructor($translate, $cookieStore, localStorageService) {
        this.$translate = $translate;
        this.$cookieStore = $cookieStore;
        this.localStorageService = localStorageService;
        this.defaultLang = this.localStorageService.get('lang');
    }

    $onInit() {
        if (!this.defaultLang) {
            this.defaultLang = 'en-us';
            this.localStorageService.set('lang', this.defaultLang);
        }
        this.$translate.use(this.defaultLang);
    }

    toggleLanguage() {
        this.defaultLang = this.languageSwitch ? 'es-es' : 'en-us';
        this.$translate.use(this.defaultLang);
        this.localStorageService.set('lang', this.defaultLang);
    }

}
MainController.$inject = ['$translate', '$cookieStore', 'localStorageService'];
export default MainController;