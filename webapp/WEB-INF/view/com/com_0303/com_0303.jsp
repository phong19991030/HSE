<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<!-- <input type="hidden" id="COMPANY_ID" name="COMPANY_ID" value="${DATA.COMPANY_ID}"></input> -->
<link rel="stylesheet" href="${ctxPath}/script/treant/Treant.css">
<link rel="stylesheet" href="${ctxPath}/script/treant/com_0303.css">

 <main id="content" class="general-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1">보건안전환경 경영방침</h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>

        <section class="contSection border">
          <div class="content">

            <!-- tab menu -->
            <!-- D : When "current" is attached to li, the currently activated style is displayed. -->
            <ul class="tab clearfix">
              <li><a href="javascript:void(0);">자료실</a></li>
              <li class="current"><a href="javascript:void(0);">안전 관리 체계</a></li>
              <li><a href="javascript:void(0);">안전 교육 계획</a></li>
            </ul>
            <!-- //tab menu -->

            <div class="content-body">
              <div class="img-box">
                <img src="../../script/com/safety-manage-system.jpg" alt="안전관리체계 이미지">
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>



	
