import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Section, Sections } from '../components/layout/Section';

const render = (levels: (1 | 2 | 3 | 4)[]) =>
  renderToStaticMarkup(
    <Sections>
      {levels.map((l, i) => (
        <Section key={i} level={l}>
          x
        </Section>
      ))}
    </Sections>,
  );

test('valid surface sequence renders', () => {
  assert.match(render([1, 3, 1, 2, 1, 2, 4]), /data-level="4"/);
});

test('two consecutive sections on the same level throw', () => {
  assert.throws(() => render([1, 1, 4]), /both level 1/);
});

test('more than one level-4 band throws', () => {
  assert.throws(() => render([1, 4, 2, 4]), /level-4 sections/);
});

test('level 4 anywhere but last throws', () => {
  assert.throws(() => render([1, 4, 1]), /final section/);
});
