class MainController {

    constructor($translate, $cookieStore, localStorageService) {
        this.$translate = $translate;
        this.$cookieStore = $cookieStore;
        this.localStorageService = localStorageService;
        this.languages = {english: 'en-us', spanish: 'es-es'};
        this.defaultLang = this.localStorageService.get('lang');
        this.yesNo = this.localStorageService.get('langStatus') || true;
    }

    $onInit() {
        if (!this.defaultLang) {
            this.defaultLang = this.languages.english;
            this.localStorageService.set('lang', this.defaultLang);
        }
        this.$translate.use(this.defaultLang);
        this.watchLanguageChange()
    }


    toggleLanguage() {
        this.defaultLang = this.yesNo ? this.languages.english : this.languages.spanish;//this.defaultLang === this.languages.english ? this.languages.spanish : this.languages.english;
        this.$translate.use(this.defaultLang);
        this.localStorageService.set('lang', this.defaultLang);
    }

}
MainController.$inject = ['$translate', '$cookieStore', 'localStorageService'];
export default MainController;