package applications.auth;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
 
public class MenuNode {
 
    private String id;
    private String parentId;
 
    private Map value;
    private MenuNode parent;
    private boolean isVisited;
 
    private List<MenuNode> children;
 
    public MenuNode() {
        super();
        this.children = new ArrayList<>();
    }
 
    public MenuNode(Map value, String childId, String parentId) {
        this.value = value;
        this.id = childId;
        this.parentId = parentId;
        this.children = new ArrayList<>();
    }
    
    public MenuNode(Map map) {
    	if(map == null) return;
        this.value = map;
        this.id = map.get("MENU_ID").toString();
        this.parentId = map.get("UP_MENU_ID").toString();
        this.children = new ArrayList<>();
    }
 
    public Map getValue() {
        return value;
    }
 
    public void setValue(Map value) {
        this.value = value;
    }
    
    public String getId() {
        return id;
    }
 
    public void setId(String id) {
        this.id = id;
    }
 
    public boolean isVisited() {
		return isVisited;
	}

	public void setVisited(boolean isVisited) {
		this.isVisited = isVisited;
	}

	public String getParentId() {
        return parentId;
    }
 
    public void setParentId(String parentId) {
        this.parentId = parentId;
    }
 
    public MenuNode getParent() {
        return parent;
    }
 
    public void setParent(MenuNode parent) {
        this.parent = parent;
    }
 
    public List<MenuNode> getChildren() {
        return children;
    }
 
    public void setChildren(List<MenuNode> children) {
        this.children = children;
    }
 
    public void addChild(MenuNode child) {
        if (!this.children.contains(child) && child != null)
            this.children.add(child);
    }
 
    @Override
    public String toString() {
        return "MenuNode [id=" + id + ", parentId=" + parentId + ", value=" + value + ", children="
                + children + "]";
    }
}