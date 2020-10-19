/
  @swagger
   components:
     schemas:
       expenseCategory:
         type: object
         required:
           - expenseCategoryId
           - expenseCategoryName
           - unid
         properties:
          expenseCategoryId:
             type: string
             description: UUID of the Expense Category
          expenseCategoryName:
             type: string
             description: The Name of the category.
           unid:
             type: string
             description: Database identifier for the category
         example:
            expenseCategoryId: 5ad744a3-527f-4dd7-a3f0-b2f837f4044d
            expenseCategoryName: Hello Colin Peter
            unid: 3C2636DFA421263BC12585FA003DB537
 /