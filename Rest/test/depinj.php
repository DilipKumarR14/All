<?php
class StockItem{
    /**
     * @var int
     */
    private $quantity;
    /**
     * @var string
     */
    private $status;

    public function __construct($quantity,$status)
    {
        $this->quantity=$quantity;
        $this->status=$status;
    }
     /**
     * Get the value of quantity
     *
     * @return  int
     */ 
    public function getQuantity()
    {
        return $this->quantity;
    }
    /**
     * Get the value of status
     *
     * @return  string
     */ 
    public function getStatus()
    {
        return $this->status;
    }
    
}

class Product{
    private $stockItem;
    private $sku;
    public function __construct($sku,StockItem $stockItem)
    {
        $this->stockItem=$stockItem;
        $this->sku=$sku;
    }

    /**
     * Get the value of stockItem
     */ 
    public function getStockItem()
    {
        return $this->stockItem;
    }

    /**
     * Get the value of sku
     */ 
    public function getSku()
    {
        return $this->sku;
    }
/**
 * another way of injecting
 */
    // public function setStockItem(StockItem $stockItem){
    //     $this->stockItem=$stockItem;
    // }


}

$s=new StockItem("2\n","Delivered\n");

$p=new Product("Levi's\n",$s);

echo $p->getSku();
echo $p->getStockItem()->getStatus();
echo $p->getStockItem()->getQuantity();

?>