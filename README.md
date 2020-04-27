# will_builder

Form Building Web App 

Intended to work as a proof of concept for Pro Bono Legal Document services that build fully executable documents that simply need to be printed and signed.
- First Build will allow the creation of a user, adding profile data to that user then ultimately create a Will Document with that data.


To install and run the webapp locally after cloning: (using node.js)
- npm install (run in both the main dir and in the client)
- npm run dev

https://medium.com/@kainikhil/nodejs-how-to-generate-and-properly-serve-pdf-6835737d118e

try {
  // Returns a `FacebookFacebookResponse` object
  $response = $fb->get(
    '/FirstInterstateBank/posts',
    '{access-token}'
  );
} catch(FacebookExceptionsFacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(FacebookExceptionsFacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
