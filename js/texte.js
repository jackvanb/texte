/*

  Texte

  Write your own text-based games

  Josh Avanier

*/

"use strict";

var Texte = {

  lif: [], // all lines in file
  sto: [], // holds Pages
  pgn: 0, // current Page number

  loadPage: function(n) {
    Texte.pgn = n
    Texte.loadContent()
  },

  loadContent: function() {
    let crp = Texte.sto[Texte.pgn],
      con = document.getElementById("content")

    // Clear
    while (con.firstChild)
      con.removeChild(con.firstChild)

    con.style.backgroundColor = crp.bg

    // Set title & Page content
    ins("div", crp.til)
    ins("span", crp.con)

    function ins(a, b) {
      let e = document.createElement(a)
      e.insertAdjacentHTML("afterBegin", b)
      e.style.color = crp.col
      con.appendChild(e)
    }
  }
}
