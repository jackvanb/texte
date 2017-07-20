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
    while (con.firstChild) {
      con.removeChild(con.firstChild)
    }

    // Set background
    con.style.backgroundColor = crp.img

    // Set title
    let ttl = document.createElement("div")
    ttl.insertAdjacentHTML("afterbegin", crp.til)
    ttl.style.color = crp.col

    // Set Page content
    let pgc = document.createElement("span")
    pgc.insertAdjacentHTML("afterbegin", crp.con)
    pgc.style.color = crp.col
    pgc.className = "content-text"

    con.appendChild(pgc)
  }
}
