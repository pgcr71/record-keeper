const SRC_ROOT_FOLDER = './src';
const DEST_ROOT_FOLDER = './dist';

module.exports = {
    scripts: {
        src: SRC_ROOT_FOLDER + '/backend/*.js',
        dest: DEST_ROOT_FOLDER
    },
    scss: {
        src: SRC_ROOT_FOLDER + '/styles.scss',
        dest: DEST_ROOT_FOLDER
    },
    watch: {
        scss: SRC_ROOT_FOLDER + '/scss/**/*.scss',
        js: SRC_ROOT_FOLDER + '/backend/**/*.js'
    }
}