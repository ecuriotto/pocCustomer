package com.audemars.piguet.rest;

import groovy.json.JsonBuilder

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.apache.http.HttpHeaders
import org.bonitasoft.engine.api.ProcessAPI
import org.bonitasoft.engine.bpm.flownode.ActivityStates
import org.bonitasoft.engine.bpm.flownode.ArchivedFlowNodeInstance
import org.bonitasoft.engine.bpm.flownode.ArchivedFlowNodeInstanceSearchDescriptor
import org.bonitasoft.engine.bpm.flownode.FlowNodeInstance
import org.bonitasoft.engine.bpm.flownode.FlowNodeInstanceSearchDescriptor
import org.bonitasoft.engine.bpm.flownode.FlowNodeType
import org.bonitasoft.engine.bpm.flownode.HumanTaskInstance
import org.bonitasoft.engine.bpm.flownode.HumanTaskInstanceSearchDescriptor
import org.bonitasoft.engine.bpm.flownode.impl.internal.ArchivedFlowNodeInstanceImpl
import org.bonitasoft.engine.search.SearchOptionsBuilder
import org.bonitasoft.web.extension.ResourceProvider
import org.bonitasoft.web.extension.rest.RestApiResponse
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder
import org.codehaus.groovy.util.ListHashMap
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import com.bonitasoft.web.extension.rest.RestAPIContext
import com.bonitasoft.web.extension.rest.RestApiController

class TasksCounters implements RestApiController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TasksCounters.class)

    @Override
    RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
        // To retrieve query parameters use the request.getParameter(..) method.
        // Be careful, parameter values are always returned as String values

        // Retrieve caseId parameter
        def processId = request.getParameter "processId"
        if (processId == null) {
            return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter processId is missing"}""")
        }
		Long processIdLong;
		try {
			processIdLong = Long.parseLong(processId); 
		}catch(Exception e) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter processId is not a valid"}""")
		}
        ProcessAPI pAPI = context.apiClient.getProcessAPI();
		SearchOptionsBuilder sob = new SearchOptionsBuilder(0, Integer.MAX_VALUE);
		sob.filter(HumanTaskInstanceSearchDescriptor.STATE_NAME, ActivityStates.READY_STATE)
		sob.and().filter(HumanTaskInstanceSearchDescriptor.PROCESS_DEFINITION_ID, processIdLong)
		List<HumanTaskInstance> listHumanTasks = pAPI.searchHumanTaskInstances(sob.done()).getResult()
		def cases =[:]
		def results = [:];
		for(HumanTaskInstance ht :listHumanTasks) {
			Integer c = results.get(ht.getName());
			if(c!= null) {
				c ++;				 
			}else {
				c = 1;
			}
			results.put(ht.getName(), c)
			def caseList = cases[ht.getName()]
			if(caseList == null) {
				caseList = [];
			}
			caseList.add(ht.getRootContainerId().toString())
			cases[ht.getName()] = caseList;
		}	
		sob = new SearchOptionsBuilder(0, Integer.MAX_VALUE);
		sob.filter(FlowNodeInstanceSearchDescriptor.STATE_NAME, ActivityStates.WAITING_STATE)
		sob.and().filter(FlowNodeInstanceSearchDescriptor.PROCESS_DEFINITION_ID, processIdLong)
		
		List<FlowNodeInstance> listFlowNodes = pAPI.searchFlowNodeInstances(sob.done()).getResult()
		for(FlowNodeInstance fn :listFlowNodes) {
			if(fn.getName().equals("Wait")) {
				continue;
			}
			Integer c = results.get(fn.getName());
			if(c!= null) {
				c ++;
			}else {
				c = 1;
			}
			results.put(fn.getName(), c)
			def caseList = cases[fn.getName()]
			if(caseList == null) {
				caseList = [];
			}
			caseList.add(fn.getRootContainerId().toString())
			cases[fn.getName()] = caseList;
		}
		
		def result =[:];
		def table = []
		def labels = []
		def values = []
		
		for(String name : results.keySet()) {
			def caseList = cases[name]
			def o = ["name":name, "counter":results.get(name), "cases":caseList]
			table.add(o);
			labels.add(name);
			values.add(results.get(name));
		}

		result.put("table",table);
		result.put("labels",labels);
		result.put("values",values);
		 
        // Send the result as a JSON representation
        // You may use buildPagedResponse if your result is multiple
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

}
