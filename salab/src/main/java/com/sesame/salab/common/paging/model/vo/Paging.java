package com.sesame.salab.common.paging.model.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

@Component
public class Paging implements Serializable {

   /**
	 * 
	 */
	private static final long serialVersionUID = 587571909730737266L;

/**
    * 
    */
   

   private int currentPage; // 현재 페이지

   private int limit = 6; // 현재 페이지에 출력할 글 갯수
   
   private double add = 1-(1.0/limit); 

   private int listCount; // DB에서의 모든 행의 합 

   private int maxPage; // 총 페이지 수

   private int startPage; // 현재 페이지가 포함된 페이지 그룹의 시작값

   private int endPage; // 현재 페이지가 포함된 페이지 그룹의 끝값

   private int startRow; // 쿼리에서 검색할 시작 행 수
   
   private int endRow;  //쿼리에서 검색할 끝 행 수 
   
   private int underlimit = 5; // 프론트 하단 페이지 개수 
   
   public Paging() {
      // TODO Auto-generated constructor stub
   }

   
   
   //페이징 메소드 
   public void makePage(int listCount, int curPage) {
      
      this.setCurrentPage(curPage); //현재 페이지
      this.setListCount(listCount); //총 페이지 개수
      
      this.setMaxPage((int)((double)listCount / limit + add));  // 마지막페이지
      //this.setStartPage((int)((double)currentPage / underlimit + add));
      this.setStartPage(    ((curPage -1)/ underlimit) * underlimit + 1      );  // 페이징목록의 시작페이지
      this.setEndPage(startPage + underlimit - 1);	//페이징목록의 마지막페이지
      this.setStartRow((curPage -1 ) * limit +1 );	//시작 열
      this.setEndRow( startRow + limit - 1 );	//끝 열
      
      if(maxPage < endPage) {
         endPage = maxPage;
      }
      
      
      
      
   }
   
   

   


   public Paging(int currentPage, int limit, double add, int listCount, int maxPage, int startPage, int endPage,
         int startRow, int endRow, int underlimit) {
      super();
      this.currentPage = currentPage;
      this.limit = limit;
      this.add = add;
      this.listCount = listCount;
      this.maxPage = maxPage;
      this.startPage = startPage;
      this.endPage = endPage;
      this.startRow = startRow;
      this.endRow = endRow;
      this.underlimit = underlimit;
   }



   @Override
   public String toString() {
      return "Paging [currentPage=" + currentPage + ", limit=" + limit + ", add=" + add + ", listCount=" + listCount
            + ", maxPage=" + maxPage + ", startPage=" + startPage + ", endPage=" + endPage + ", startRow="
            + startRow + ", endRow=" + endRow + ", underlimit=" + underlimit + "]";
   }



   public int getCurrentPage() {
      return currentPage;
   }



   public void setCurrentPage(int currentPage) {
      this.currentPage = currentPage;
   }



   public int getLimit() {
      return limit;
   }



   public void setLimit(int limit) {
      this.limit = limit;
   }



   public double getAdd() {
      return add;
   }



   public void setAdd(double add) {
      this.add = add;
   }



   public int getListCount() {
      return listCount;
   }



   public void setListCount(int listCount) {
      this.listCount = listCount;
   }



   public int getMaxPage() {
      return maxPage;
   }



   public void setMaxPage(int maxPage) {
      this.maxPage = maxPage;
   }



   public int getStartPage() {
      return startPage;
   }



   public void setStartPage(int startPage) {
      this.startPage = startPage;
   }



   public int getEndPage() {
      return endPage;
   }



   public void setEndPage(int endPage) {
      this.endPage = endPage;
   }



   public int getStartRow() {
      return startRow;
   }



   public void setStartRow(int startRow) {
      this.startRow = startRow;
   }



   public int getEndRow() {
      return endRow;
   }



   public void setEndRow(int endRow) {
      this.endRow = endRow;
   }



   public int getUnderlimit() {
      return underlimit;
   }



   public void setUnderlimit(int underlimit) {
      this.underlimit = underlimit;
   }




   
   
   
   
   
   
   

}