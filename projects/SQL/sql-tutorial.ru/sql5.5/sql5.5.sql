S E L E C T   C O U N T ( m o d e l )   A S   Q t y  
   F R O M   P C  
   W H E R E   m o d e l   I N   ( S E L E C T   m o d e l  
   F R O M   P r o d u c t  
   W H E R E   m a k e r   =   ' A '  
   ) ;  
  
   S E L E C T   *   F R O M   P C  
   S E L E C T   *   F R O M   P r o d u c t  
  
   S E L E C T   *   F R O M   P C   l e f t   j o i n   P r o d u c t   o n   P C . m o d e l   =   P r o d u c t . m o d e l 