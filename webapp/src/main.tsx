import { AppRegistry } from 'react-native';
import App from '../../mobile/App';
import appJson from '../../mobile/app.json';

AppRegistry.registerComponent(appJson.name, () => App);
AppRegistry.runApplication(appJson.name, {
  rootTag: document.getElementById('root'),
});
