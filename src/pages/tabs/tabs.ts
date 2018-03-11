import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { VotePage } from '../vote/vote';
import { StarPage } from '../star/star';
import { FilejoPage } from '../filejo/filejo';
import { JCaeyulPage } from '../j-caeyul/j-caeyul';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = VotePage;
  tab5Root = StarPage;
  tab6Root = FilejoPage;
  tab7Root = JCaeyulPage;

  constructor() {

  }
}
