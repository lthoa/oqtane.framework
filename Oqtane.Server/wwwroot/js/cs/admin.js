export function onUpdate() {
    if (document.querySelector('.admin-theme') || document.querySelector('.admin-container')) {
        document.querySelector('body').classList.add('admin-page');
    }
}