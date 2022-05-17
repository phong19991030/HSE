<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container system-wrap system-wrap1">
  <!-- 알람코드 테이블 관리 -->
  <div class="system-detail-wrap">
    <div class="system-left">
      <!--tit-wrap-->
      <div class="tit-wrap">
        <h2 class="heading3">
          <span class="txt">Part code</span>
          <!-- <span class="version">V47</span> -->
        </h2>
        <ul class="location">
          <li>SYSTEM</li>
          <li>Code management </li>
          <li class="bold">Part code</li>
        </ul>
      </div>
      <!--//tit-wrap-->
      <!-- registration form -->
      <div class="registration-form registration-form1">
        <div class="registration-form-lst-wrap maintenance-write-form">
          <ul class="registration-form-lst registration-form-lst-bg">
            <li>
              <div class="registration-write btn-input-wrap">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <span class="code-name">A</span>
                    <label for="code1" class="sr-only">code</label>
                    <input type="text" name="code1" id="code1" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                    <a href="" class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
              <ul class="depth2">
                <li>
                  <div class="registration-write btn-input-wrap">
                    <div class="input-group-wrapper">
                      <div class="input-group">
                        <span class="code-name">02</span>
                        <label for="code1-1" class="sr-only">Action</label>
                        <input type="text" name="code1-1" id="code1-1" placeholder="">
                      </div>
                      <div class="add-delete-btn-wrap">
                        <a href="" class="delete-btn">
                          <span class="sr-only">delete</span>
                          <i class="xi-minus-square"></i>
                        </a>
                        <a href="" class="add-btn">
                          <span class="sr-only">add</span>
                          <i class="xi-plus-square"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="registration-write btn-input-wrap">
                    <div class="input-group-wrapper">
                      <div class="input-group">
                        <span class="code-name">04</span>
                        <label for="code1-2" class="sr-only">Action</label>
                        <input type="text" name="code1-2" id="code1-2" placeholder="">
                      </div>
                      <div class="add-delete-btn-wrap">
                        <a href="" class="delete-btn">
                          <span class="sr-only">delete</span>
                          <i class="xi-minus-square"></i>
                        </a>
                        <a href="" class="add-btn">
                          <span class="sr-only">add</span>
                          <i class="xi-plus-square"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div class="registration-write btn-input-wrap">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <span class="code-name">B</span>
                    <label for="code2" class="sr-only">code</label>
                    <input type="text" name="code2" id="code2" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                    <a href="" class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
              <ul class="depth2">
                <li>
                  <div class="registration-write btn-input-wrap">
                    <div class="input-group-wrapper">
                      <div class="input-group"> 
                        <span class="code-name">08</span>   
                        <label for="code2-1" class="sr-only">code</label>
                        <input type="text" name="code2-1" id="code2-1" placeholder="">
                      </div>
                      <div class="add-delete-btn-wrap">
                        <a href="" class="delete-btn">
                          <span class="sr-only">delete</span>
                          <i class="xi-minus-square"></i>
                        </a>
                        <a href="" class="add-btn">
                          <span class="sr-only">add</span>
                          <i class="xi-plus-square"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="registration-write btn-input-wrap">
                    <div class="input-group-wrapper">
                      <div class="input-group">
                        <span class="code-name">09</span>   
                        <label for="code2-2" class="sr-only">code</label>
                        <input type="text" name="code2-2" id="code2-2" placeholder="">
                      </div>
                      <div class="add-delete-btn-wrap">
                        <a href="" class="delete-btn">
                          <span class="sr-only">delete</span>
                          <i class="xi-minus-square"></i>
                        </a>
                        <a href="" class="add-btn">
                          <span class="sr-only">add</span>
                          <i class="xi-plus-square"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
             <li class="more">
             	<a href="">
             		<i class="xi-plus-circle"></i>
             	</a>
             </li>
          </ul>
          
          <ul class="registration-form-lst">
            <li>
              <span>Code*</span>
              <div class="registration-write btn-input-wrap btn-input-twice-wrap">
                <div class="input-group">
                  <label for="maintenancecode" class="sr-only">Code</label>
                  <input type="text" name="maintenancecode" id="maintenancecode" placeholder="">
                </div>
                <div class="input-group">
                  <label for="maintenancecode" class="sr-only">Code</label>
                  <input type="text" name="maintenancecode" id="maintenancecode" placeholder="">
                </div>
                <button type="button" class="registration-search-btn">Register</button>
              </div>
            </li>
            <li>
              <span>Code*</span>
              <div class="registration-write btn-input-wrap btn-input-twice-wrap">
                <div class="input-group">
                  <label for="maintenancecode" class="sr-only">Code</label>
                  <input type="text" name="maintenancecode" id="maintenancecode" placeholder="">
                </div>
                <div class="input-group">
                  <label for="maintenancecode" class="sr-only">Code</label>
                  <input type="text" name="maintenancecode" id="maintenancecode" placeholder="">
                </div>
                <button type="button" class="registration-search-btn">Register</button>
              </div>
            </li>
            <li>
              <span>Code*</span>
              <div class="registration-write btn-input-wrap">
                <div class="input-group">
                  <label for="maintenancecode" class="sr-only">Code</label>
                  <input type="text" name="maintenancecode" id="maintenancecode" placeholder="">
                </div>
                <button type="button" class="registration-search-btn">Register</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- //registration form -->
    </div>
    <div class="system-right">
      <div class="btns">
        <a href="" class="btn-style btn-style1">Save</a>
        <a href="" class="btn-style btn-style2">Cancel</a>
        <!-- <a href="" class="btn-style btn-style3">Delete</a> -->
      </div>
    </div>
  </div>
  <!-- //알람코드 테이블 관리 -->
</div>

<jsp:include page="include/footer.jsp"></jsp:include>