using System;

namespace Sales;
public class Sale
{
    public string Id { get; set;}
    public string Description { get; set;}
    public List<SaleItem> SaleItems{ get; set;}
}

public class SaleItem {
    public string SaleHeaderId { get; set;}
    public int LineI { get; set;}
    public string Description { get; set;}
    public double Price { get; set;}
}