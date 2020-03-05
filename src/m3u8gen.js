$("#inputText").keyup(() => {
  m3u8gen()
})

const m3u8gen = (val) => {
  const inputTextValue = $("#inputText").val()
  const replaceSpaceWithPlus = $("#spaceWithPlus").is(":checked")
  const appendVal = JSON.parse(JSON.stringify($("#appendToUrl").val())) // ugly but it works
  const prependVal = JSON.parse(JSON.stringify($("#prependToUrl").val()))

  console.log(JSON.stringify(appendVal))

  const m3u8 = inputTextValue
    .split('\n')
    .map((val) => (val.startsWith(`"`) && val.endsWith(`"`) ? val.slice(0, val.length - 1).slice(1) : val))
    .map((val) => replaceSpaceWithPlus ? val.replace(' ',  '+') : val)
    .map((val) => [appendVal, val, prependVal].filter((v) => !_.isEmpty(v)).join(''))
    .reduce((result, val) => {
      result.push(
        `#EXTINF:225,${val.split('/').slice(-3).join(' - ')}`,
        val,
      )
      return result
    }, ["#EXTM3U"])
    .join('\n')

    $("#outputText").val(m3u8)
}
