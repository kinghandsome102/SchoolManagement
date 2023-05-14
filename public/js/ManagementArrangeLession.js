
/**
 * Function Name: showTable
 * input: string
 * OutPut: none
 * Call when selection is choosen
 */
function showTable(idTableshow) {
    var showTable = document.getElementById(idTableshow);
    showTable.style.removeProperty('display');
}

/**
 * Funtion Name: hideTable
 * input: String
 * ouput: none
 * call when user is not choosen in select bar
 */
function hideTable(idTableHide) {
    var showTable = document.getElementById(idTableHide);
    showTable.style.display = 'none';
}

/* function choose arrang or Show salary
input: none;
Output: none;
call when user click selection in seclect bar
*/
function arrangeOrShow() {
    var select = document.getElementById('ArrangeOrShowsalary');
    var optionValue = select.options[select.selectedIndex].value;
    if (optionValue == '1') {
        showTable('ShowArangeLession');
        hideTable('ShowTeacherSalary');
    }
    else if (optionValue == '2') {
        showTable('ShowTeacherSalary');
        hideTable('ShowArangeLession');
    }
}