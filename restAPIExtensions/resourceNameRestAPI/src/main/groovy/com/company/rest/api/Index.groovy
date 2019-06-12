package com.company.rest.api;

import groovy.json.JsonBuilder

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.ws.rs.client.Client
import javax.ws.rs.client.ClientBuilder
import javax.ws.rs.client.Invocation
import javax.ws.rs.client.WebTarget
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.MultivaluedHashMap
import javax.ws.rs.core.MultivaluedMap
import javax.ws.rs.core.Response

import org.apache.http.HttpHeaders
import org.bonitasoft.engine.bpm.parameter.ParameterInstance
import org.bonitasoft.engine.bpm.process.ProcessInstance
import org.bonitasoft.web.extension.ResourceProvider
import org.bonitasoft.web.extension.rest.RestApiResponse
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import com.bonitasoft.web.extension.rest.RestAPIContext
import com.bonitasoft.web.extension.rest.RestApiController

class Index implements RestApiController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CreateMco.class)

    @Override
    RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
        // To retrieve query parameters use the request.getParameter(..) method.
        // Be careful, parameter values are always returned as String values

        // Retrieve APtoken parameter
		def path = request.getParameter "path"
		if (path == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter path is missing"}""")
        }

        def serialNumber = request.getParameter "serialNumber"
        def itemId = request.getParameter "itemId"
        def ldapUsername = request.getParameter "ldapUsername"
        def app = request.getParameter "app"
        def faciId = request.getParameter "faciId"
        def currencyId = request.getParameter "currencyId"
        def diviId = request.getParameter "diviId"
        def languageId = request.getParameter "languageId"
        def tableName = request.getParameter "tableName"
        def orderId = request.getParameter "orderId"
		
		def processApi = context.getApiClient().getProcessAPI();
		def processDefinitionId = processApi.getProcessDefinitionId("GlobalFlow", "1.0")
		def ParameterInstance urlParameter = processApi.getParameterInstance(processDefinitionId, "urlTalendApi");
		def ParameterInstance apTokenParameter = processApi.getParameterInstance(processDefinitionId, "apToken");
		def url = urlParameter.getValue();

		Client client = ClientBuilder.newClient();
		WebTarget webTarget	= client.target(url);
		WebTarget specificTarget = webTarget.path(path);
		Invocation.Builder invocationBuilder = specificTarget.request(MediaType.APPLICATION_JSON);
		
		MultivaluedMap head = new MultivaluedHashMap();
		
		//Only for postman test. to remove once the webservices are set
		head.add("x-api-key", apTokenParameter.getValue());
		
		//real token, here it's saved as a parameter just for testing.
		head.add("token", apTokenParameter.getValue());
		
		if(serialNumber != null) {
			head.add("serialNumber",serialNumber);
		}
		if(itemId != null) {
			head.add("itemId",itemId);
		}
		if(ldapUsername != null) {
			head.add("ldapUsername",ldapUsername);
		}
		else {
			head.add("ldapUsername","jperroncel");
		}
		if(app != null) {
			head.add("app",app);
		}
		else {
			head.add("app","POS");
		}
		if(faciId != null) {
			head.add("faciId",faciId);
		}
		else {
			head.add("faciId","");
		}
		if(currencyId != null) {
			head.add("currencyId",currencyId);
		}
		else {
			head.add("currencyId","CHF");
		}
		if(diviId != null) {
			head.add("diviId",diviId);
		}
		else {
			head.add("diviId","101");
		}
		if(languageId != null) {
			head.add("languageId",languageId);
		}
		else {
			head.add("languageId","FR");
		}
		if(tableName != null) {
			head.add("tableName",tableName);
		}
		else {
			head.add("tableName","FCL2");
		}
		
		if(orderId != null) {
			head.add("orderId",orderId);
		}
		else {
			head.add("orderId","");
		}

		head.add("Content-Type", "application/json;charset=UTF-8");
		
		invocationBuilder.headers(head);
		
		String response = invocationBuilder.get(String.class);
		//response.toString();
		
        // Prepare the result
        //def result = [ "url" : response.getEntity()]

        // Send the result as a JSON representation
        // You may use buildPagedResponse if your result is multiple
		return buildResponse(responseBuilder, HttpServletResponse.SC_OK, response)
        //return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(response).toString())
    }

    /**
     * Build an HTTP response.
     *
     * @param  responseBuilder the Rest API response builder
     * @param  httpStatus the status of the response
     * @param  body the response body
     * @return a RestAPIResponse
     */
    RestApiResponse buildResponse(RestApiResponseBuilder responseBuilder, int httpStatus, Serializable body) {
        return responseBuilder.with {
            withResponseStatus(httpStatus)
            withResponse(body)
            build()
        }
    }

    /**
     * Returns a paged result like Bonita BPM REST APIs.
     * Build a response with a content-range.
     *
     * @param  responseBuilder the Rest API response builder
     * @param  body the response body
     * @param  p the page index
     * @param  c the number of result per page
     * @param  total the total number of results
     * @return a RestAPIResponse
     */
    RestApiResponse buildPagedResponse(RestApiResponseBuilder responseBuilder, Serializable body, int p, int c, long total) {
        return responseBuilder.with {
            withContentRange(p,c,total)
            withResponse(body)
            build()
        }
    }

    /**
     * Load a property file into a java.util.Properties
     */
    Properties loadProperties(String fileName, ResourceProvider resourceProvider) {
        Properties props = new Properties()
        resourceProvider.getResourceAsStream(fileName).withStream { InputStream s ->
            props.load s
        }
        props
    }

}
