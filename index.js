const fs = require('fs')
var LineReader = require('linereader')
var data = fs.readFileSync('./check.json')
var res = data.toString().split('\n').length
const tLine = res - 1
const fileCount = Math.floor(tLine / 20)
const remaining = tLine % 20

var lr = new LineReader('./check.json')
var params = {}
for (let i = 1; i <= fileCount; i++) {
  params[i] = {
    ['Counters']: [],
  }
  const paramsR = {
    ['Counters']: [],
  }
  lr.on('line', function (lineno, line) {
    if (
      lineno <= i * 20 &&
      lineno > (i - 1) * 20
    ) {
      params[i].Counters.push({
        PutRequest: JSON.parse(line),
      })
    }
    if (lineno === i * 20) {
      // console.log(lineno, 'check2')
      fs.writeFile(
        `final${i}.json`,
        JSON.stringify(params[i]),
        {
          encoding: 'utf8',
        },
        (err, data) => {
          if (err) {
            return console.log(err, 'Error')
          }
          console.log(params[i].Counters.length)
        }
      )
    }
    if (
      lineno > fileCount * 20 &&
      remaining !== 0
    ) {
      paramsR.Counters.push({
        PutRequest: JSON.parse(line),
      })
      if (lineno === fileCount * 20 + remaining) {
        fs.writeFile(
          `finalRemaining.json`,
          JSON.stringify(paramsR),
          {
            encoding: 'utf8',
          },
          (err, data) => {
            if (err) {
              return console.log(err, 'lllll')
            }
            console.log(paramsR.Counters.length)
          }
        )
      }
    }
  })
}
// rl.on('close', () => {
//   fs.writeFile(
//     'final.json',
//     JSON.stringify(params),
//     (err, data) => {
//       if (err) {
//         return console.log(err)
//       }
//       console.log(data)
//     }
//   )
// })
