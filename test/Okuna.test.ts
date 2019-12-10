import { expect } from 'chai';
import { Client } from '../src/Okuna';

import { AuthAPI } from '../src/api/auth';
import { CategoriesAPI } from '../src/api/categories';
import { CirclesAPI } from '../src/api/circles';
import { CommunitiesAPI } from '../src/api/communities';
import { ConnectionsAPI } from '../src/api/connections';
import { DevicesAPI } from '../src/api/devices';
import { EmojisAPI } from '../src/api/emojis';
import { FollowsAPI } from '../src/api/follows';
import { HashtagsAPI } from '../src/api/hashtags';
import { HealthAPI } from '../src/api/health';
import { ListsAPI } from '../src/api/lists';
import { ModerationAPI } from '../src/api/moderation';
import { NotificationsAPI } from '../src/api/notifications';
import { PostsAPI } from '../src/api/posts';
import { UserInvitesAPI } from '../src/api/userInvites';

describe('Client', function () {
  describe('@constructor', function () {
    describe('.apiUrl', function () {
      it('should return default API url if not provided', function () {
        const client = new Client({ authToken: 'my-token' });
        return expect(client.apiUrl).to.eql('https://api.openbook.social');
      });

      it('should set custom API url', function () {
        const client = new Client({ apiUrl: 'http://localhost:8000', authToken: 'my-token' });
        return expect(client.apiUrl).to.eql('http://localhost:8000');
      });

      it('should set token to null if not provided', function () {
        const client = new Client();
        return expect(client.authToken).to.be.null;
      });
    });

    describe('.requestStrategy', function () {
      it('should default to fetch', function () {
        const client = new Client({ authToken: 'my-token' });
        return expect(client.requestStrategy).to.eql('fetch');
      });
    });

    describe('magic header', function () {
      it('should set default headers if not provided', function () {
        const client = new Client({ authToken: 'my-token' });
        return expect(client.magicHeaderName).to.eql('X-JESUS-TAKE-THE-WHEEL');
      });

      it('should set magic header to null on null', function () {
        const client = new Client({ authToken: 'my-token', magicHeaderName: null });
        return expect(client.magicHeaderName).to.eql(null);
      });

      it('should set custom magic headers', function () {
        const client = new Client({
          authToken: 'my-token',
          magicHeaderName: 'X-MY-OWN-HEADER',
          magicHeaderValue: 'myOwnValue'
        });

        expect(client.magicHeaderName).to.eql('X-MY-OWN-HEADER');
        expect(client.magicHeaderValue).to.eql('myOwnValue');
      });
    });
  });

  describe('#_buildMagicHeader', function () {
    beforeEach(function () {
      this.client = new Client({ authToken: 'my-token' });
    });

    it('should return nulls on null values', function () {
      return expect(this.client._buildMagicHeader(null, null)).to.eql({
        name: null,
        value: null
      });
    });

    it('should return custom values', function () {
      const name = 'X-MY-OWN-HEADER';
      const value = 'myOwnValue';

      return expect(this.client._buildMagicHeader(name, value)).to.eql({ name, value });
    });

    it('should return defaults when not provided', function () {
      return expect(this.client._buildMagicHeader()).to.eql({
        name: 'X-JESUS-TAKE-THE-WHEEL',
        value: 'jesusCantReallyDriveTho'
      });
    });
  });

  describe('#updateAuthToken', function () {
    it('should update', function () {
      const client = new Client({ authToken: 'old-token' });
      client.updateAuthToken('my-new-token');
      return expect(client.authToken).to.eql('my-new-token');
    });
  });

  describe('APIs', function () {
    beforeEach(function () {
      this.client = new Client({ authToken: 'my-token' });
    });

    it('#auth', function () {
      return expect(this.client.auth()).to.be.instanceof(AuthAPI);
    });

    it('#categories', function () {
      return expect(this.client.categories()).to.be.instanceof(CategoriesAPI);
    });

    it('#circles', function () {
      return expect(this.client.circles()).to.be.instanceof(CirclesAPI);
    });

    it('#communities', function () {
      return expect(this.client.communities()).to.be.instanceof(CommunitiesAPI);
    });

    it('#connections', function () {
      return expect(this.client.connections()).to.be.instanceof(ConnectionsAPI);
    });

    it('#devices', function () {
      return expect(this.client.devices()).to.be.instanceof(DevicesAPI);
    });

    it('#emojis', function () {
      return expect(this.client.emojis()).to.be.instanceof(EmojisAPI);
    });

    it('#follows', function () {
      return expect(this.client.follows()).to.be.instanceof(FollowsAPI);
    });

    it('#hashtags', function () {
      return expect(this.client.hashtags()).to.be.instanceof(HashtagsAPI);
    });

    it('#health', function () {
      return expect(this.client.health()).to.be.instanceof(HealthAPI);
    });

    it('#lists', function () {
      return expect(this.client.lists()).to.be.instanceof(ListsAPI);
    });

    it('#moderation', function () {
      return expect(this.client.moderation()).to.be.instanceof(ModerationAPI);
    });

    it('#notifications', function () {
      return expect(this.client.notifications()).to.be.instanceof(NotificationsAPI);
    });

    it('#posts', function () {
      return expect(this.client.posts()).to.be.instanceof(PostsAPI);
    });

    it('#userInvites', function () {
      return expect(this.client.userInvites()).to.be.instanceof(UserInvitesAPI);
    });
  });
});
