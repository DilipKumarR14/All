<?php

class Check extends CI_Controller{

    public function geti(){
        $this->load->model("HomeModel");
        $data['row'] = $this->HomeModel->getData();
        $this->load->view("viewfile",$data);
    }
}