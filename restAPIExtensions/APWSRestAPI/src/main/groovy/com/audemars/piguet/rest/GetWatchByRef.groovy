package com.audemars.piguet.rest;

import groovy.json.JsonBuilder

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import wslite.http.auth.HTTPBasicAuthorization
import wslite.soap.SOAPClient
import wslite.soap.SOAPResponse
import org.apache.http.HttpHeaders
import org.bonitasoft.web.extension.ResourceProvider
import org.bonitasoft.web.extension.rest.RestApiResponse
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import com.bonitasoft.web.extension.rest.RestAPIContext
import com.bonitasoft.web.extension.rest.RestApiController

class GetWatchByRef implements RestApiController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GetWatchByRef.class)

    @Override
    RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
        		
		Properties props = loadProperties("configuration.properties", context.resourceProvider)
        
        String serial = request.getParameter "serial"
		Map<String, String> result = [:]
		SOAPResponse response;
		if (serial == null) {
			result.put "error", "the attribute serial is missing"
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST, new JsonBuilder(result).toString())
		}else {
			if(serial.length() < 4 ) {
				result.put "error", "the attribute serial has to have at least 4 caracters"
				return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST, new JsonBuilder(result).toString())
			
		} else {
			try {
								
				SOAPClient client = new SOAPClient(props["soapURL"])
				
				client.authorization = new HTTPBasicAuthorization(props["wsUser"], props["wsPass"]);
				response = client.send(
				"""<?xml version='1.0' encoding='UTF-8'?>
						<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cred="http://lawson.com/ws/credentials" xmlns:get="http://audemarspiguet.com/APWS/getWatchesByRef">	   
							<soapenv:Body>
								<get:getWatchesByRef>
									<get:pCompany>100</get:pCompany>
									<get:pReference>"""+serial+"""</get:pReference>
								</get:getWatchesByRef>
							</soapenv:Body>
						</soapenv:Envelope>"""
				)
	
				result = ["watches":getOutput(response)];
				
			} catch (Exception e) {
				result.put "error", e.getMessage()
				e.printStackTrace();
				return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST, new JsonBuilder(result).toString())
				
			}
		}
		}		
        
        return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(result).toString())
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
	
	def getOutput(def response) {
		
	    //return convertToMap(response.getWatchesBySNResponse.WatchCollection)
		response.getWatchesByRefResponse.WatchCollection.WatchItem.collect{
			w -> convertToMap(w)
		}
		
	}
	def convertToMap(nodes) {
		nodes.children().collectEntries {
			[ it.name(), it.childNodes() ? convertToMap(it) : it.text() ]
		}
	}
	

}
