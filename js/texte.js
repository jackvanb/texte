/**
 * Texte
 * Write text-based games
 *
 * @author Josh Avanier
 * @license MIT
 */

'use strict';

var Texte = {

  lif: [], // all lines in file
  sto: [], // holds Pages
  pgn: 0, // current Page number

  loadPage(n) {
    Texte.pgn = n
    Texte.loadContent()
  },

  loadContent() {
    let crp = Texte.sto[Texte.pgn]
    let con = document.getElementById('content')

    let ins = (a, b) => {
      let e = document.createElement(a)
      e.insertAdjacentHTML('afterBegin', b)
      e.style.color = crp.col
      con.appendChild(e)
    }

    while (con.firstChild) {
      con.removeChild(con.firstChild)
    }

    con.style.backgroundColor = crp.bg

    ins('div', crp.til)
    ins('span', crp.con)
  }
}
