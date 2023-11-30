import { BehaviorSubject } from 'rxjs';

export interface DecisionNode {
  type: 'options' | 'text' | 'url';
  title: string;
  options?: DecisionNode[];
  text?: string;
  url?: string;
}

export class DecisionController {
  stack: DecisionNode[] = [];
  current: BehaviorSubject<DecisionNode>;

  get current$() {
    return this.current.asObservable();
  }

  constructor(public readonly initial: DecisionNode) {
    this.current = new BehaviorSubject<DecisionNode>(initial);
    this.stack.push(initial);
  }

  select(node: DecisionNode) {
    this.stack.push(node);
    this.current.next(node);
  }

  back() {
    if (this.stack.length > 1) {
      this.stack.pop();
      const last = this.stack[this.stack.length - 1];
      this.current.next(last);
    }
  }

  reset() {
    this.stack = [this.initial];
    this.current.next(this.initial);
  }
}


