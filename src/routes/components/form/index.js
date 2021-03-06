import {
  Form, FormItem, Row, Col, Divider, Button, Input, Checkbox,
  Switch, Radio, RadioGroup, Select, Textarea, Notify,
} from 'uiw';
import Markdown from '../../../components/Markdown';

export default class Page extends Markdown {
  path = 'packages/core/src/form/README.md';
  dependencies = { Form, FormItem, Row, Col, Divider, Button, Input, Checkbox, Switch, Radio, RadioGroup, Select, Textarea, Notify };
  async renderPage() {
    const md = await import('../../../../packages/core/src/form/README.md');
    return md.default || md;
  }
}
