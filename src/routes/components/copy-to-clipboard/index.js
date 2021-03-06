import { CopyToClipboard, Button, Input } from 'uiw';
import Markdown from '../../../components/Markdown';

export default class Page extends Markdown {
  path = 'packages/core/src/copy-to-clipboard/README.md';
  dependencies = { CopyToClipboard, Button, Input };
  async renderPage() {
    const md = await import('../../../../packages/core/src/copy-to-clipboard/README.md');
    return md.default || md;
  }
}
