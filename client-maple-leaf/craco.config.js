import { resolve } from 'path';

export default {
  alias: {
    assets: resolve(__dirname, 'src/assets/'),
    store: resolve(__dirname, 'src/store/'),
    components: resolve(__dirname, 'src/components/'),
    containers: resolve(__dirname, 'src/containers/'),
    utils: resolve(__dirname, 'src/utils/'),
    theme: resolve(__dirname, 'src/theme/'),
    i18n: resolve(__dirname, 'src/i18n/'),
    mocks: resolve(__dirname, 'src/mocks/'),
    modals: resolve(__dirname, 'src/modals/'),
  },
};
