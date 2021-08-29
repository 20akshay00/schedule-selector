let reftable;
let selected_courses = [];
let all_courses = [];
let tbl;

/* HTML Table Construction helper functions*/
  function addCell(tr, val) {
    var td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td)
  }

  function addHeadCell(tr, val) {    
    var th = document.createElement('th');
    th.innerHTML = val;
    tr.appendChild(th)
  }

  function addRow(tbl, first, vals) {
    var tr = document.createElement('tr');
    var tbody = tbl.children[1];

    addHeadCell(tr, first);

    for(let val of vals)
    {
        addCell(tr, val);
    }

    tbody.appendChild(tr);
  }

  function addHead(tbl, first, vals) {
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    
    addHeadCell(tr, first);

    for(let val of vals)
    {
        addHeadCell(tr, val);
    }

    thead.appendChild(tr);
    tbl.appendChild(thead)
  }

  function createBody(tbl){
    var tbody = document.createElement('tbody');
    tbl.appendChild(tbody);
  }
/* HTML Table Construction helper functions END*/

/* Parses the input csv format into a reference table*/
  function makeRefTable(){
    let ref_table = document.getElementById('reftable').innerHTML.replaceAll(' ', '').trim();
    let ref_rows_raw = ref_table.split("\n");
    let ref_rows = [];
    for(row_raw of ref_rows_raw){

      row_formatted = row_raw.split(",");
      row_final = [];

      for(elt of row_formatted){
        row_final.push(elt.split("|"));
        all_courses = all_courses.concat(elt.split("|"));
      }

      ref_rows.push(row_final);
    }

    all_courses = [...new Set(all_courses)].filter(item => item !== "").filter(item => item !== "-").sort();
    
    return ref_rows;
}

/* Constructs new reference table (not html) based on selected course list*/

  function makeNewTable(selected_courses){
    new_table = [];

    for(row of reftable){
      new_row = [];
      for(elt of row){
        intersect = elt.filter(i => selected_courses.includes(i)); 
        new_row.push((intersect.length > 0) ? intersect.join("<br>") : "-");
      }
      new_table.push(new_row);
    }

    return new_table;
  }

  /* Constructs new HTML table based on selected course list*/

  function constructTable(tbl, selected_courses){
    table_new = makeNewTable(selected_courses);

    while (tbl.hasChildNodes()) {
      tbl.removeChild(tbl.lastChild);
    }

    addHead(tbl, "", ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]);
    createBody(tbl);
    addRow(tbl, "08:00", table_new[0]);
    addRow(tbl, "09:00", table_new[1]);
    addRow(tbl, "10:00", table_new[2]);
    addRow(tbl, "11:00", table_new[3]);
    addRow(tbl, "12:00", table_new[4]);
    addRow(tbl, "13:00", table_new[5]);
    addRow(tbl, "14:00", table_new[6]);
    addRow(tbl, "15:00", table_new[7]);
    addRow(tbl, "16:00", table_new[8]);
    addRow(tbl, "17:00", table_new[9]);
  }

  /* Create master list of courses in dropdown*/

  function addDataList(){
    var options = '';
    for(option of all_courses){
      options += '<option value="' + option + '" />';
    }
    document.getElementById("code-picker").innerHTML = options;
  }

  /* Update the selected course list display */

  function updateCourse(){
    var courselist = document.getElementById("selected-courses");
    courselist.innerHTML = "Selected courses: " + selected_courses.join(", "); 
  }
  
  /* Construct default table */

  function main() {
    tbl = document.getElementById('tbl');
    addHead(tbl, "", ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]);
    createBody(tbl);
    addRow(tbl, "08:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "09:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "10:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "11:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "12:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "13:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "14:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "15:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "16:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "17:00", ['-', '-', '-', '-', '-', '-']);
  
    reftable = makeRefTable();
    addDataList();
  }


  /* onClick functions for the input buttons */

  function addCourse(){
    var inputVal = document.getElementsByClassName("code-picker")[0].value.trim();
    if((all_courses.includes(inputVal)) && !(selected_courses.includes(inputVal))) {
      selected_courses.push(inputVal);
      updateCourse();
      generate();
    }

    document.getElementsByClassName("code-picker")[0].value = "";
  }

  function removeCourse(){
    var inputVal = document.getElementsByClassName("code-picker")[0].value.trim();
    if(selected_courses.includes(inputVal)) {
      selected_courses = selected_courses.filter(item => item !== inputVal);
      updateCourse();
      generate();
    }

    document.getElementsByClassName("code-picker")[0].value = "";
  }
  
  function removeAll(){
    selected_courses = [];
    updateCourse();
    generate();
  }

  function addAll(){
    selected_courses = [...all_courses];
    var courselist = document.getElementById("selected-courses");
    courselist.innerHTML = "Selected courses: All";
 
    generate();
  }

  function generate(){
    constructTable(tbl, selected_courses);
  }

  /* onClick functions for the input buttons END*/

  function setColor(){
    var src = document.getElementById('color-picker');
    var r = document.querySelector(':root');
    r.style.setProperty('--color', src.value);
  }