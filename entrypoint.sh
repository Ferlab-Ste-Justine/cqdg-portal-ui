#!/bin/sh

# Generate a unique filename for config.js based on the current timestamp to prevent cache issue
# its disable for now: we dont see any cache issue yet
#UNIQUE_CONFIG_FILENAME="config-$(date +%s).js"
UNIQUE_CONFIG_FILENAME="config.js"

# Generate config.js with a unique filename
cat <<EOF > "/usr/share/nginx/html/static/js/$UNIQUE_CONFIG_FILENAME"
window._env_ = {
  REACT_APP_WRAPPER_API_URL: "$REACT_APP_WRAPPER_API_URL",
  REACT_APP_PROJECT_ID: "$REACT_APP_PROJECT_ID",
  REACT_APP_KC_AUTH_SERVER_URL: "$REACT_APP_KC_AUTH_SERVER_URL",
  REACT_APP_KC_CLIENT_ID: "$REACT_APP_KC_CLIENT_ID",
  REACT_APP_KC_REALM: "$REACT_APP_KC_REALM",
  SASS_PATH: "$SASS_PATH",
  REACT_APP_USERS_API_URL: "$REACT_APP_USERS_API_URL",
  REACT_APP_CQDG_WEB_APP: "$REACT_APP_CQDG_WEB_APP",
  REACT_APP_CQDG_WEB_SITE: "$REACT_APP_CQDG_WEB_SITE",
  REACT_APP_CQDG_DOCUMENTATION: "$REACT_APP_CQDG_DOCUMENTATION",
  REACT_APP_CQDG_DICTIONARY: "$REACT_APP_CQDG_DICTIONARY",
  REACT_APP_USER_SNAP_API_KEY: "$REACT_APP_USER_SNAP_API_KEY",
  REACT_APP_REPORTS_API_URL: "$REACT_APP_REPORTS_API_URL",
  REACT_APP_IS_BETA: "$REACT_APP_IS_BETA"
  REACT_APP_MANIFEST_API_URL: "$REACT_APP_MANIFEST_API_URL"
  REACT_APP_CAVATICA_ENABLED: "$REACT_APP_CAVATICA_ENABLED"
  REACT_APP_PROGRAMS_ENABLED: "$REACT_APP_PROGRAMS_ENABLED"
  REACT_APP_PROGRAMS_PAGES_ENABLED: "$REACT_APP_PROGRAMS_PAGES_ENABLED"
  REACT_APP_S3_ASSETS_URL: "$REACT_APP_S3_ASSETS_URL"
};
EOF

# Dynamically update the index.html to reference the new unique config.js filename
#sed -i "s|config.js|$UNIQUE_CONFIG_FILENAME|" /usr/share/nginx/html/index.html

# Start Nginx
nginx -g "daemon off;"
