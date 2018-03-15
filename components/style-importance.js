// Make glamorous styling the most specific by using id on <body>!
// See: https://github.com/threepointone/glamor/issues/107
import { plugins } from 'glamor';

function specific({ selector, style }) {
  const newSelector = selector
    .split(',')
    .map(s => `#root ${s}`)
    .join(',');
  return { selector: newSelector, style };
}

plugins.add(specific);
