<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script>
  $(document).ready(function(){
    //user
    $('strong#USER_NAME').html("${DATA.session.USER_NM}");

    //role
    $('span#USER_ROLE_NAME').html("${DATA.session.ROLE_NM_LIST}");

    $('button#LOG_OUT_BTN').click(logout);

    $('a#LOGO_BTN').click(e=>{
      window.location = CTX + '/main/main';
    })
    $( "#PAGE_SIZE" ).change(function() {
      $('#PAGENATION').children('.active').text('1');      
    });
  });

  

	function alertHelp() {
		alert("<spring:message code='msg.alert.help'/>");
	}

  function logout() {
		var url = CTX + '/common/auth/logout';
		window.location.href = url;
	}
</script>

<div class="wrap">
	<header class="main-header">
      <div class="header-wrap">
        <a href="#" class="logo" id="LOGO_BTN">
          <span class="sr-only">상단로고</span>
        </a>
        <nav id="nav">
          <ul class="gnb">
          
          	<c:forEach items="${SESS_MENU.MENU.List}" var="menu1" varStatus="loop">
	          	<c:if test="${menu1.value.READ_YN eq 'Y' && menu1.value.MENU_OUT_YN != 'Y'}">
					<c:set var="url" value="${ctxPath}${menu1.value.LINK_PATH}?${menu1.value.PARAM}"></c:set>
	          		<li menu-id="${menu1.value.MENU_ID}" class="depth1 ${menu1.value.MENU_ID eq navimenu.SUBMENU.MENU_ID? 'active': ''}">
	          			<a href="${fn:length(menu1.value.LINK_PATH)>0  ? url :'#'}">
	          				<c:if test="${loop.count == 1}">
			          			<i class="las la-box"></i>
	          				</c:if>
	          				<c:if test="${loop.count == 2}">
			          			<i class="las la-archive"></i>
	          				</c:if>
	          				<c:if test="${loop.count == 3}">
			          			<i class="las la-briefcase-medical"></i>
	          				</c:if>
	          				<c:if test="${loop.count == 4}">
			          			<i class="las la-hard-hat"></i>
	          				</c:if>
	          				<c:if test="${loop.count == 5}">
			          			<i class="las la-wrench"></i>
	          				</c:if>
	          				<c:if test="${loop.count > 5}">
			          			<i class="las la-globe-americas"></i>
	          				</c:if>
		          			<span>${menu1.value.MENU_NM}</span>
		          		</a>
	          			<div class="depth-wrap">
		          			<ul class="depth2">
		          				<c:forEach items="${menu1.value.List}" var="menu2" varStatus="loop">
									<c:if test="${menu2.value.READ_YN eq 'Y' && menu2.value.MENU_OUT_YN != 'Y'}">
										<c:set var="url" value="${ctxPath}${menu2.value.LINK_PATH}?${menu2.value.PARAM}"></c:set>
										<li><a href="${fn:length(menu2.value.LINK_PATH)>0  ? url :''}" onclick="clearStorage()"><span>${menu2.value.MENU_NM }</span></a></li>
				          			</c:if>
		          				</c:forEach>
		          			</ul>  
	          			</div>
	          		</li>
          		</c:if>
          	</c:forEach>
          </ul>
        </nav>
        
        <!-- header-user-area -->
        <div class="header-user-area">
          <span class="user-info">
            <strong id="USER_NAME" class="name"></strong>
            <span id="USER_ROLE_NAME" class="position"></span>
          </span>

          <button id="LOG_OUT_BTN" class="logout-btn">LOGOUT</button>
          <ul class="header-side">
            <!-- D : alarm-toggle click -> "open" class is added to parents li. -->
            <li>
              <button class="alarm-toggle">
                <i class="las la-bell"></i>
                <span class="new-num">1</span>
              </button>
              <!-- alarm-panel -->
              <div class="alarm-panel">
                <a href="javascript:void(0);" class="go-btn">
                  <i class="las la-paste"></i>
                  <span>내 결재 이력 보기</span>
                </a>
                <!-- my-approval -->
                <section class="my-approval">
                  <div class="tit-area">
                    <span class="tit">내 결재</span>
                    <div class="approval-state">
                      <span class="state proceed">
                        <em class="txt">진행</em>
                        <strong class="num">3</strong>
                      </span>
                      <span class="state return">
                        <em class="txt">반려</em>
                        <strong class="num">1</strong>
                      </span>
                    </div>
                  </div>
                  <!-- ------------------------------------------ -->
                  <div class="approval-history-wrap">
                    <ul>
                      <li>
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <strong>결재 완료</strong>
                            <span class="history-lst">
                              <em>보건관리</em>
                              <em>직원 건강 관리</em>
                            </span>
                          </div>
                          <span class="date-time">
                            <em class="date">2021.11.21</em>
                            <em class="time">16:42</em>
                          </span>
                        </a>
                      </li>
                      <!-- D : approval state color
                        결재 진행 : li + proceed 
                        결재 반려 : li + return
                        -->
                      <li class="proceed">
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <strong>결재 진행</strong>
                            <span class="history-lst">
                              <em>보건관리</em>
                              <em>직원 건강 관리</em>
                            </span>
                          </div>
                          <span class="date-time">
                            <em class="date">2021.11.21</em>
                            <em class="time">13:03</em>
                          </span>
                        </a>
                      </li>
                      <!-- D : approval state color
                        	결재 진행 : li + proceed 
                       		 결재 반려 : li + return
                        -->
                      <li class="return">
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <strong>결재 반려</strong>
                            <span class="history-lst">
                              <em>안전관리</em>
                              <em>작업공구 및 장비관리</em>
                            </span>
                          </div>
                          <span class="date-time">
                            <em class="date">2021.11.20</em>
                            <em class="time">17:54</em>
                          </span>
                        </a>
                      </li>
                      <!-- D : approval state color
                        	결재 진행 : li + proceed 
                        	결재 반려 : li + return
                        -->
                      <li class="proceed">
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <strong>결재 진행</strong>
                            <span class="history-lst">
                              <em>안전관리</em>
                              <em>작업공구 및 장비관리</em>
                            </span>
                          </div>
                          <span class="date-time">
                            <em class="date">2021.11.20</em>
                            <em class="time">15:36</em>
                          </span>
                        </a>
                      </li>
                      <!-- D : approval state color
                        	결재 진행 : li + proceed 
                        	결재 반려 : li + return
                        -->
                      <li class="proceed">
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <strong>결재 진행</strong>
                            <span class="history-lst">
                              <em>작업관리</em>
                              <em>작업 허가관리</em>
                            </span>
                          </div>
                          <span class="date-time">
                            <em class="date">2021.11.19</em>
                            <em class="time">11:04</em>
                          </span>
                        </a>
                      </li>
                    </ul>
                    <!-- no-txt (There is no notification.)-->
                    <div class="no-txt">
                      <p>알림 내용이 없습니다.</p>
                    </div>
                  </div>
                  <!-- ------------------------------------------ -->
                </section>

                <!-- ========================= -->
                <!-- wait-approval -->
                <section class="wait-approval">
                  <div class="tit-area">
                    <span class="tit">결재 대기</span>
                    <div class="approval-state">
                      <span class="state wait">
                        <em class="txt">대기</em>
                        <strong class="num">10</strong>
                      </span>
                    </div>
                  </div>
                  <!-- ------------------------------------------ -->
                  <div class="approval-history-wrap">
                    <ul>
                      <li>
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <span class="history-lst">
                              <em>보건관리</em>
                              <em>직원 건강 관리</em>
                            </span>
                          </div>
                          <div class="flexWrap both">
                            <span class="date-time">
                              <em class="date">2021.11.21</em>
                              <em class="time">16:42</em>
                            </span>
                            <span class="staff-info">
                              <em class="name">이길동</em>
                              <em class="position">대리</em>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <span class="history-lst">
                              <em>보건관리</em>
                              <em>직원 건강 관리</em>
                            </span>
                          </div>
                          <div class="flexWrap both">
                            <span class="date-time">
                              <em class="date">2021.11.21</em>
                              <em class="time">13:03</em>
                            </span>
                            <span class="staff-info">
                              <em class="name">나길동</em>
                              <em class="position">대리</em>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <span class="history-lst">
                              <em>작업관리</em>
                              <em>작업공구 및 장비 관리</em>
                            </span>
                          </div>
                          <div class="flexWrap both">
                            <span class="date-time">
                              <em class="date">2021.11.20</em>
                              <em class="time">17:54</em>
                            </span>
                            <span class="staff-info">
                              <em class="name">채길동</em>
                              <em class="position">대리</em>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <span class="history-lst">
                              <em>보건관리</em>
                              <em>직원 건강 관리</em>
                            </span>
                          </div>
                          <div class="flexWrap both">
                            <span class="date-time">
                              <em class="date">2021.11.20</em>
                              <em class="time">14:06</em>
                            </span>
                            <span class="staff-info">
                              <em class="name">나길동</em>
                              <em class="position">대리</em>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <span class="history-lst">
                              <em>작업관리</em>
                              <em>작업공구 및 장비 관리</em>
                            </span>
                          </div>
                          <div class="flexWrap both">
                            <span class="date-time">
                              <em class="date">2021.11.19</em>
                              <em class="time">09:23</em>
                            </span>
                            <span class="staff-info">
                              <em class="name">박길동</em>
                              <em class="position">주임</em>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <span class="history-lst">
                              <em>보건관리</em>
                              <em>직원 건강 관리</em>
                            </span>
                          </div>
                          <div class="flexWrap both">
                            <span class="date-time">
                              <em class="date">2021.11.21</em>
                              <em class="time">16:42</em>
                            </span>
                            <span class="staff-info">
                              <em class="name">이길동</em>
                              <em class="position">대리</em>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <div class="approval-info">
                            <span class="history-lst">
                              <em>보건관리</em>
                              <em>직원 건강 관리</em>
                            </span>
                          </div>
                          <div class="flexWrap both">
                            <span class="date-time">
                              <em class="date">2021.11.21</em>
                              <em class="time">16:42</em>
                            </span>
                            <span class="staff-info">
                              <em class="name">이길동</em>
                              <em class="position">대리</em>
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                    <!-- no-txt (There is no notification.)-->
                    <div class="no-txt">
                      <p>알림 내용이 없습니다.</p>
                    </div>
                  </div>
                  <!-- ------------------------------------------ -->
                </section>
              </div>
              <!-- //alarm-panel -->
            </li>
          </ul>
        </div>
        <!-- //header-user-area -->
          		
        <!-- //header-side -->
      </div>
      <div class="lnb-bg"></div>
    </header>
</div>


<script type="text/javascript">
	var ctx = '${CTX}';
	var _timezone = '${CLIENT_ACCESS_TIMEZONE}';
	
	function clearStorage(){
		localStorage.clear();
	}
</script>

<%-- <script src="${ctxPath}/script/common/system_alarm.js"></script> --%>



