# Transaction and TransactionStep Models Documentation

This document consolidates the understanding of shared models, Figma designs, and project structure to outline the upcoming models `Transaction` and `TransactionStep`. It also provides an overview of how these models integrate with the existing system.

---

## **Key Takeaways from Existing Models**

### **1. Users**
- **Roles**: Users can act as agents, buyers, or sellers, defined via the `Role` model.
- **Profiles**:
  - `AgentProfile` connects agents to transactions and properties.
  - `InvestorProfile` represents buyers or sellers in transactions.
- **Permissions**: Roles determine access and actions in the transaction lifecycle.

### **2. Properties**
- Properties play a central role in transactions.
  - **`Property`**: Provides property details like type, availability status, and ownership.
  - **`AgentAssociatedProperty`**: Links agents to specific properties.
  - Financial attributes (e.g., `asking_price`) influence commission calculations.

### **3. Notifications**
- Models like `Notification` and `NotificationSettings` manage alerts for events such as step updates or transaction status changes.

### **4. Common Fields**
- The `Common` model offers fields like `created_ts`, `updated_ts`, `created_by`, and `updated_by`, which are inherited by most models.

---

## **Proposed Models**

### **1. Transaction**
Represents a property transaction involving agents, buyers, and sellers.

| Field                  | Type                  | Description                                                                 |
|------------------------|-----------------------|-----------------------------------------------------------------------------|
| `id`                   | `UUID`               | Unique identifier for the transaction.                                      |
| `property`             | `ForeignKey(Property)`| Links to the property involved in the transaction.                         |
| `agent`                | `ForeignKey(AgentProfile)`| Links to the agent managing the transaction.                                |
| `buyer`                | `ForeignKey(InvestorProfile)`| Links to the buyer involved in the transaction.                             |
| `seller`               | `ForeignKey(InvestorProfile)`| Links to the seller involved in the transaction.                            |
| `status`               | `CharField`          | Tracks the current status (e.g., `OFFER_ACCEPTED`, `IN_PROGRESS`, `SOLD`). |
| `offer_price`          | `DecimalField`       | Final offer price for the property.                                         |
| `total_commission`     | `DecimalField`       | Total commission calculated for the transaction.                            |
| `completed_steps`      | `DecimalField`       | Percentage of steps completed (calculated dynamically).                     |
| `created_ts`           | `DateTimeField`      | Timestamp for when the transaction was created.                             |
| `updated_ts`           | `DateTimeField`      | Timestamp for the last update to the transaction.                          |

### **2. TransactionStep**
Represents individual steps in a transaction.

| Field                  | Type                  | Description                                                                 |
|------------------------|-----------------------|-----------------------------------------------------------------------------|
| `id`                   | `UUID`               | Unique identifier for the step.                                             |
| `transaction`          | `ForeignKey(Transaction)`| Links the step to a specific transaction.                                   |
| `step_name`            | `CharField`          | Name of the step (e.g., `OFFER_ACCEPTED`, `AGREEMENT_OF_SALE`).             |
| `step_order`           | `IntegerField`       | Defines the order of the step in the transaction lifecycle.                 |
| `is_completed`         | `BooleanField`       | Indicates if the step is completed.                                         |
| `can_edit`             | `BooleanField`       | Indicates if the step can be edited by the user.                            |
| `completed_by`         | `ForeignKey(User)`   | Tracks who completed the step.                                              |
| `completion_ts`        | `DateTimeField`      | Timestamp for when the step was completed.                                  |
| `created_ts`           | `DateTimeField`      | Timestamp for when the step was created.                                    |
| `updated_ts`           | `DateTimeField`      | Timestamp for the last update to the step.                                  |

---

## **Integration with Existing Models**

### **1. Transaction ↔ Property**
- A `Transaction` is linked to a single `Property`.

### **2. Transaction ↔ Users**
- Each transaction has one agent, one buyer, and one seller.

### **3. Transaction ↔ TransactionStep**
- A transaction can have multiple steps (`OneToMany` relationship).

### **4. Notifications ↔ Transaction/Steps**
- Notifications are triggered on transaction or step updates.

---

## **Field Mapping from Figma Designs**

### **Transaction**
- **Property Card**:
  - **`property`**: Links to the `Property` model.
  - **`status`**: Represents the current status of the transaction.
  - **`total_commission`**: Shown to agents.
- **User Details**:
  - **`agent`**, **`buyer`**, **`seller`** fields for linking roles.
- **Completion**:
  - **`completed_steps`**: Dynamically calculated.

### **TransactionStep**
- **Steps and Validation**:
  - Steps like `Offer`, `Agreement of Sale`, and `Ownership Transfer`.
  - **`is_completed`** and **`step_order`** for tracking progress and enforcing sequential rules.
- **Notifications**:
  - Triggered when **`is_completed`** or **`can_edit`** changes.

---

## **Steps from Designs**

### **Transaction Steps**
The following steps are part of the transaction lifecycle:

1. **Offer Accepted**:
   - **Description**: Initial step triggered when an offer for the property is accepted.
   - **Conditions**: Automatically marked as completed; no manual interaction allowed.
   - **Notifications**: Notify agent, seller, and buyer.

2. **Agreement of Sale**:
   - **Description**: The buyer and seller finalize the sale agreement.
   - **Conditions**: Cannot proceed without completing `Offer Accepted`.
   - **User Interaction**: Both seller and buyer must confirm completion.

3. **Ownership Transfer Initiation**:
   - **Description**: Documents required for ownership transfer are submitted.
   - **Conditions**: Requires confirmation from both parties.
   - **Dependencies**: Can only be initiated after `Agreement of Sale`.

4. **Ownership Transfer Completion**:
   - **Description**: Final step where ownership is officially transferred.
   - **Conditions**: All prior steps must be completed.
   - **User Interaction**: Verified by both buyer and agent.

5. **Payment Completion**:
   - **Description**: Marks the completion of financial transactions.
   - **Dependencies**: Cannot proceed until `Ownership Transfer Completion` is verified.

6. **Transaction Closure**:
   - **Description**: Marks the transaction as closed and finalized.
   - **Conditions**: Automatically updated once all other steps are marked complete.
   - **Notifications**: Notify all stakeholders.

---

### **Additional Details**
1. **Completion Percentage Calculation**:
   - **Formula**: `(Completed Steps / Total Steps) * 100`.
   - **Step Weightage**: Equal weight for all steps; each completed step contributes equally to the percentage.

2. **Role-Based Access**:
   - **Agent**: Can view and update steps for both buyer and seller.
   - **Buyer/Seller**: Can update only their respective steps.

3. **Validation Rules**:
   - Steps must be completed in order.
   - Attempting to skip or uncheck previous steps triggers an error:
     - *"Please complete the previous steps before proceeding to the next step."*
   - Unchecking a step requires reversing all subsequent steps:
     - *"To uncheck Step 2, you must first uncheck Step 3."*

4. **Notifications**:
   - Sent to relevant users whenever a step is completed or updated.
   - Includes:
     - Step completion updates.
     - Errors during step updates.

5. **Agent Commission**:
   - Total commission is displayed to the agent only.
   - Calculated based on `offer_price` and predefined rates.

---
