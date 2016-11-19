class MainController {

    constructor($translate, $cookieStore, localStorageService) {
        this.$translate = $translate;
        this.$cookieStore = $cookieStore;
        this.localStorageService = localStorageService;
        this.defaultLang = this.localStorageService.get('lang');
        this.languageSwitch = this.defaultLang === 'en-us' ? true : false;
    }

    $onInit() {
        this.items = [
            'The first choice!',
            'And another choice for you.',
            'but wait! A third!'
        ];

        this.status = {
            isopen: false
        };
        if (!this.defaultLang) {
            this.defaultLang = 'en-us';
            this.localStorageService.set('lang', this.defaultLang);
        }
        this.$translate.use(this.defaultLang);
    }

    toggleLanguage() {
        this.defaultLang = this.languageSwitch ? 'en-us' : 'es-es';
        this.$translate.use(this.defaultLang);
        this.localStorageService.set('lang', this.defaultLang);
    }
    changeLanguage(lang) {
        this.defaultLang = lang;
        this.$translate.use(this.defaultLang);
        this.localStorageService.set('lang', this.defaultLang);
    }

    toggled(open) {
        console.log('Dropdown is now: ', open);
    }

    toggleDropdown($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }
}
MainController.$inject = ['$translate', '$cookieStore', 'localStorageService'];
export default MainController;