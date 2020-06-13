export function hex2rgb (color) {
  let r, g, b
  if (/^#?([a-fA-F0-9]{3}){1,2}$/.test(color)) {
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16)
      g = parseInt(color[2] + color[2], 16)
      b = parseInt(color[3] + color[3], 16)
    } else {
      r = parseInt(color[1] + color[2], 16)
      g = parseInt(color[3] + color[4], 16)
      b = parseInt(color[5] + color[6], 16)
    }
    return [r, g, b]
  }
  const m = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (m) {
    r = parseInt(m[1], 10)
    g = parseInt(m[2], 10)
    b = parseInt(m[3], 10)
    return [r, g, b]
  }
}

export function isLight (color) {
  const [r, g, b] = hex2rgb(color)
  return r * 299 + g * 587 + b * 144 > 200000
}

export function wordRGB (word) {
  word = word.replace(/^\s+(.*)\s+$/g, '$1')
  const rgb = [0, 0, 0]
  for (let i = 0; i < word.length; i++) {
    const level = parseInt(i / rgb.length)
    const hashNum = parseInt((word[i].charCodeAt() << 5) % 242)
    rgb[i % 3] += parseInt(hashNum / Math.pow(5, level))
  }
  for (let j = 0; j < rgb.length; j++) {
    if (rgb[j] > 255) {
      rgb[j] = 255
    }
  }
  return rgb
}

export function wordColor (word) {
  const rgb = wordRGB(word)
  return 'rgb(' + rgb.join(',') + ')'
}
