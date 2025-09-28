import {Component} from '@angular/core';
import {NoSqlQuery} from '@xprng/query';

@Component({
  selector: 'query-demo',
  imports: [
    NoSqlQuery
  ],
  template: `
    <h1>Query Demo</h1>
    <p>
      A work in progress NoSql query component.
    </p>
    <article>
      <xpr-no-sql-query/>
    </article>
  `
})
export default class SlidesDemo {

}
