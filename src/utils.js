var utils = {

    today(f = 0) {
        let tday = new Date();
        let yyyy = String(tday.getFullYear()).substring(2, 4);
        let mm = String(tday.getMonth() + 1).padStart(2, '0');
        let dd = String(tday.getDate()).padStart(2, '0');
        let hh = String(tday.getHours()).padStart(2, '0');
        let nn = String(tday.getMinutes()).padStart(2, '0');
        let ss = String(tday.getSeconds()).padStart(2, '0');
        if (f == 0) return yyyy + mm + dd + hh + nn + ss;
        if (f == 1) return dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + nn;
        if (f == 2) return dd + '.' + mm + '.' + yyyy + ' / ' + hh + ':' + nn;
    },

    scrollDown(id) {
        setTimeout(() => {
            let objDiv = document.getElementById(id);
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 0)
    },

}

export default utils