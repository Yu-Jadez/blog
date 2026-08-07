import { describe, expect, it } from 'vitest';
import { stripMarkdown } from './utils';

describe('stripMarkdown', () => {
  it('removes markdown syntax and keeps readable text', () => {
    const md = [
      '# 标题',
      '',
      '**加粗** 和 *斜体*，以及 `行内代码`。',
      '',
      '- 列表项一',
      '- 列表项二',
      '',
      '> 引用内容',
      '',
      '[链接文本](https://example.com)',
      '',
      '1. 有序一',
      '2. 有序二',
      '',
      '---',
      '',
      '![图片](img.png) 结尾。',
    ].join('\n');

    const out = stripMarkdown(md);

    expect(out).not.toMatch(/[#*`[\]()>]/);
    expect(out).toContain('加粗');
    expect(out).toContain('链接文本');
    expect(out).toContain('结尾');
  });

  it('removes code blocks entirely', () => {
    const md = '正文\n\n```js\nconst x = 1;\n```\n\n继续';
    const out = stripMarkdown(md);

    expect(out).not.toContain('const');
    expect(out).toContain('正文');
    expect(out).toContain('继续');
  });

  it('truncates long text with an ellipsis and stays within limit', () => {
    const out = stripMarkdown('一个 '.repeat(100), 20);

    expect(out.endsWith('…')).toBe(true);
    expect(out.length).toBeLessThanOrEqual(22);
  });

  it('leaves short plain text untouched', () => {
    expect(stripMarkdown('你好，世界')).toBe('你好，世界');
  });
});
