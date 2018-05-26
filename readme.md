## marionette-seed

### Installation

    ./install.sh
    
### Usage
#### httpie

    http -f POST http://localhost:8000/session/login username=usernmae password=password --session=/tmp/session.json
    http http://localhost:8000/session--session=/tmp/session.json
    http DELETE http://localhost:8000/session/logout --session=/tmp/session.json
    
    http http://skynet.shintech.ninja:8000/api/devices --session=/tmp/session.json
    http http://skynet.shintech.ninja:8000/api/users --session=/tmp/session.json

#### Development
    
    npm run watch
    npm run webpack
    npm run dev
    
### TODO

- [ ] Authentication
- [ ] Error Handling
- 