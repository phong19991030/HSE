package module.util;

import org.bson.Document;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperationContext;

import com.mongodb.DBObject;

//public class CustomAggregationOperation implements AggregationOperation{
//	
//	// spring-data-mognodb 2.1.3.RELEASE
//	private String jsonOperation;
//	
//	public CustomAggregationOperation(String jsonOperation) {
//		this.jsonOperation = jsonOperation;
//	}
//	
//	@Override
//	public Document toDocument(AggregationOperationContext context) {
//		return context.getMappedObject(Document.parse(jsonOperation));
//	}
//
//	
//	// spring-data-mognodb 1.7.2.RELEASE
//	private DBObject operation;
//	
//	public CustomAggregationOperation(DBObject operation) {
//		this.operation = operation;
//	}
//	
//	@Override
//	public DBObject toDBObject(AggregationOperationContext context) {
//		return context.getMappedObject(operation);
//	}
//	
//}
