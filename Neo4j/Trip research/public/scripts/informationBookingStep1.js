const tabs = [...document.querySelectorAll('.information-tab-item')];
const contents = document.querySelectorAll('.information-content-block')

tabs.forEach((tab, index) => {
    const content = contents[index];

    tab.onclick = function () {
        document.querySelector('.information-tab-item.tab-active').classList.remove('tab-active');
        document.querySelector('.information-content-block.content-active').classList.remove('content-active');

        this.classList.add('tab-active');
        content.classList.add('content-active');
    }
})
