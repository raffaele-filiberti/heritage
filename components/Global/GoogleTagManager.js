import React from 'react';
import gtmParts from 'react-google-tag-manager';
import PropTypes from 'prop-types';

class GoogleTagManager extends React.Component {
    componentDidMount() {
        const dataLayerName = this.props.dataLayerName || 'dataLayer';
        const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

        if (!window[dataLayerName]) {
            const gtmScriptNode = document.getElementById(scriptId);

            eval(gtmScriptNode.textContent);
        }
    }

    render() {
        const gtm = gtmParts({
            id: process.env.GOOGLE_TAG_MANAGER_ID || this.props.gtmId,
            dataLayerName: this.props.dataLayerName || 'dataLayer',
            additionalEvents: this.props.additionalEvents || {},
            previewVariables: this.props.previewVariables || false,
            scheme: this.props.scheme || 'https:',
        });

        console.log(process.env.GOOGLE_TAG_MANAGER_ID);

        return (
            <div>
                <div>{gtm.noScriptAsReact()}</div>
                <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
                    {gtm.scriptAsReact()}
                </div>
            </div>
        );
    }
}

GoogleTagManager.propTypes = {
    gtmId: PropTypes.string.isRequired,
    dataLayerName: PropTypes.string,
    additionalEvents: PropTypes.object,
    previewVariables: PropTypes.string,
    scriptId: PropTypes.string,
    scheme: PropTypes.string,
};

export default GoogleTagManager;